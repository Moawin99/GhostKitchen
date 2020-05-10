package JavaBackend.app.requests;

import JavaBackend.app.config.UserPrincliples;
import JavaBackend.app.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository repository;
    @Autowired
    AuthenticationManager manager;
    @Autowired
    BCryptPasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;

    /**
     * This method sends back a list of all users in the data base
     * @return A List of all Users
     */

    @GetMapping("/user")
    public List<User> findAll() {
        return repository.findAll();
    }

    /**
     * This method takes in a User and saves the user to the data base as a customer
     * @param  entity User
     * @return A 200 Http Status
     */
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User entity) {
        if (repository.existsByUserName(entity.getUserName())) {
            return new ResponseEntity<>("Usernamer already exists", HttpStatus.BAD_REQUEST);
        }
        entity.setPassword(encoder.encode(entity.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER);
        entity.setRoles(Collections.singleton(userRole));
        repository.save(entity);
        return new ResponseEntity<>("Account Created", HttpStatus.OK);
    }

    /**
     * This method takes in a User and saves it as an owner
     * @param entity User
     * @return A 200 Http Status
     */
    @PostMapping("/register/owner")
    public ResponseEntity<?> createOwner(@RequestBody User entity) {
        if (repository.existsByUserName(entity.getUserName())) {
            return new ResponseEntity<>("UserName already exists", HttpStatus.BAD_REQUEST);
        }
        entity.setPassword(encoder.encode(entity.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_OWNER);
        entity.setRoles(Collections.singleton(userRole));
        repository.save(entity);
        return new ResponseEntity<>("Owner Account Created", HttpStatus.OK);
    }

    /**
     * This method takes in a User and creates a session
     * @param entity User
     * @return A 200 Http Status
     */
    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody User entity) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(entity.getUserName(), entity.getPassword())
        );
        UserPrincliples loggedInUser = (UserPrincliples) authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok("User Logged In");
    }

    /**
     * This method gets the current user that's logged in
     * @param princliple User Principle
     * @return User
     */
    @GetMapping("/currentUser")
    public User getCurrentUser(@CurrentUser UserPrincliples princliple) {
        return repository.findById(princliple.getId()).get();
    }

    /**
     * This method logs out the current user
     * @param request HttpServletRequest
     * @return A 200 Http Status
     * @throws ServletException servlet exception
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws ServletException {
        SecurityContextHolder.clearContext();
        request.logout();
        return ResponseEntity.ok("User Logged Out");
    }

    /**
     * This method updates current users info
     * @param user User
     * @param princliples User Principles
     * @return A 200 Http Status
     */
    @PutMapping("/user/update")
    public ResponseEntity<?> updateUserInfo(@RequestBody User user,@CurrentUser UserPrincliples princliples){
       repository.findById(princliples.getId()).map(x -> {
           x.setFirstName(user.getFirstName());
           x.setLastName(user.getLastName());
           x.setEmail(user.getEmail());
           x.setStreetName(user.getStreetName());
           x.setCity(user.getCity());
           x.setState(user.getState());
           x.setZip(user.getZip());
           x.setUserName(user.getUserName());
           x.setPassword(encoder.encode(user.getPassword()));
           repository.save(x);
           return ResponseEntity.ok("User Updated!");
       });
       return ResponseEntity.ok("User Account Updated!");
    }

    /**
     * This method takes in a user and creates a restaurant or updates a current restaurant
     * @param restaurant Restaurant
     * @param userPrincliples User Principles
     * @return A 200 Http Status
     */
    @PutMapping("/owner/restaurant")
    public ResponseEntity<?> saveOrUpdateRestaurant(@RequestBody Restaurant restaurant, @CurrentUser UserPrincliples userPrincliples) {
        User temp = repository.findById(userPrincliples.getId()).get();
        if(temp.getRestaurant() == null){
            temp.setRestaurant(new Restaurant());
            temp.getRestaurant().setName(restaurant.getName());
            temp.getRestaurant().setStreetName(restaurant.getStreetName());
            temp.getRestaurant().setCity(restaurant.getCity());
            temp.getRestaurant().setState(restaurant.getState());
            temp.getRestaurant().setZip(restaurant.getZip());
            repository.save(temp);
            return ResponseEntity.ok("Restaurant Created");
        }
        else{
            temp.getRestaurant().setName(restaurant.getName());
            temp.getRestaurant().setStreetName(restaurant.getStreetName());
            temp.getRestaurant().setCity(restaurant.getCity());
            temp.getRestaurant().setState(restaurant.getState());
            temp.getRestaurant().setZip(restaurant.getZip());
            repository.save(temp);
            return ResponseEntity.ok("Restaurant has been updated");
        }

    }


    /**
     * This method takes in the current user and a Menu Item and saves it to the data base
     * @param item MenuItem
     * @param princliples User Principles
     * @return A 200 Https Status
     */
    @PutMapping("/owner/restaurant/menuItems")
    public ResponseEntity<?> createMenuItem(@RequestBody MenuItem item, @CurrentUser UserPrincliples princliples) {
        User temp = repository.findById(princliples.getId()).get();
        item.setRestaurant(temp.getRestaurant());
        temp.getRestaurant().getMenu().add(item);
        repository.save(temp);
        return ResponseEntity.ok(item.getName() + " Saved!");
    }

    /**
     * This method deletes a user based on the id from the Path Variable
     * @param id Long
     */
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
