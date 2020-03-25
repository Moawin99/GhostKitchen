package JavaBackend.app.requests;

import JavaBackend.app.config.UserPrincliples;
import JavaBackend.app.model.CurrentUser;
import JavaBackend.app.model.Role;
import JavaBackend.app.model.RoleName;
import JavaBackend.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/user/register")
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

    @PutMapping("/loggout")
    public void loggout(){
        SecurityContextHolder.clearContext();
    }

    @PutMapping("/user/{id}")
    public User saveOrUpdate(@RequestBody User entity, @PathVariable Long id) {
        return repository.findById(id).map(x -> {
            x.setFirstName(entity.getFirstName());
            x.setLastName(entity.getLastName());
            x.setUserName(entity.getUserName());
            x.setPassword(entity.getPassword());
            x.setEmail(entity.getPassword());
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

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
