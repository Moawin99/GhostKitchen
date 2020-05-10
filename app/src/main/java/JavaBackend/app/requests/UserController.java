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

    @GetMapping("/user")
    public List<User> findAll() {
        return repository.findAll();
    }

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

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody User entity) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(entity.getUserName(), entity.getPassword())
        );
        UserPrincliples loggedInUser = (UserPrincliples) authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok("User Logged In");
    }

    @GetMapping("/currentUser")
    public User getCurrentUser(@CurrentUser UserPrincliples princliple) {
        return repository.findById(princliple.getId()).get();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws ServletException {
        SecurityContextHolder.clearContext();
        request.logout();
        return ResponseEntity.ok("User Logged Out");
    }

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


    @PutMapping("/owner/restaurant/menuItems")
    public ResponseEntity<?> createMenuItem(@RequestBody MenuItem item, @CurrentUser UserPrincliples princliples) {
        User temp = repository.findById(princliples.getId()).get();
        item.setRestaurant(temp.getRestaurant());
        temp.getRestaurant().getMenu().add(item);
        repository.save(temp);
        return ResponseEntity.ok(item.getName() + " Saved!");
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
