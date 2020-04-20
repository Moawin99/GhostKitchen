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

    @PutMapping("/user/{id}")
    public User saveOrUpdate(@RequestBody User entity, @PathVariable Long id) {
        return repository.findById(id).map(x -> {
            x.setFirstName(entity.getFirstName());
            x.setLastName(entity.getLastName());
            x.setUserName(entity.getUserName());
            x.setPassword(entity.getPassword());
            x.setEmail(entity.getEmail());
            x.setStreetName(entity.getStreetName());
            x.setCity(entity.getCity());
            x.setState(entity.getState());
            x.setZip(entity.getZip());
            return repository.save(x);
        }).orElseGet(() -> {
            entity.setId(id);
            return repository.save(entity);
        });
    }

    @PutMapping("/owner/restaurant")
    public ResponseEntity<?> saveOrUpdateRestaurant(@RequestBody Restaurant restaurant, @CurrentUser UserPrincliples userPrincliples) {
        User temp = repository.findById(userPrincliples.getId()).get();
        if (temp.getRoles().contains(roleRepository.findByName(RoleName.ROLE_OWNER))) {
            if (temp.getRestaurant() != null) {
                repository.findById(temp.getId()).map(x -> {
                    x.getRestaurant().setName(restaurant.getName());
                    x.getRestaurant().setStreetName(restaurant.getStreetName());
                    x.getRestaurant().setCity(restaurant.getCity());
                    x.getRestaurant().setState(restaurant.getState());
                    x.getRestaurant().setZip(restaurant.getZip());
                    repository.save(x);
                    return ResponseEntity.ok("Restaurant Updated!");
                });
                return ResponseEntity.ok("Restaurant Updated!");
            }
            else {
                repository.findById(temp.getId()).map(x -> {
                    x.setRestaurant(new Restaurant());
                    x.getRestaurant().setName(restaurant.getName());
                    x.getRestaurant().setStreetName(restaurant.getStreetName());
                    x.getRestaurant().setCity(restaurant.getCity());
                    x.getRestaurant().setState(restaurant.getState());
                    x.getRestaurant().setZip(restaurant.getZip());
                    repository.save(x);
                    return ResponseEntity.ok("Restaurant Saved");
                });
                return ResponseEntity.ok("Restaurant Saved");
            }
        }

        return new ResponseEntity<>("Regular users cannot access personal restaurant data!", HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
