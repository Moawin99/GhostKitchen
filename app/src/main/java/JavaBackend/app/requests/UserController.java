package JavaBackend.app.requests;

import JavaBackend.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository repository;

    @GetMapping("/user")
    public List<User> findAll() {
        return repository.findAll();
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> createUser(@RequestBody User entity) {
        if (repository.existsByUserName(entity.getUserName())){
            return new ResponseEntity<>("Usernamer already exists", HttpStatus.BAD_REQUEST);
        }
        repository.save(entity);
        return new ResponseEntity<>("Account Created", HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody User entity) {
        if (repository.getByUserName(entity.getUserName()) != null) {
            User temp = repository.getByUserName(entity.getUserName());
            if (temp.getPassword().equals(entity.getPassword())) {
                return new ResponseEntity<>(temp, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
