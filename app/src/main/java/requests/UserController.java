package requests;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository repository;

    @GetMapping("/user")
    public List<User> findAll(){
        return repository.findAll();
    }

    @PostMapping("/user")
    public User createUser(@RequestBody User entity){
        return repository.save(entity);
    }

    @PutMapping("/user/{id}")
    public User saveOrUpdate(@RequestBody User entity, @PathVariable Long id){
        return repository.findById(id).map(x -> {
            x.setFirstName(entity.getFirstName());
            x.setLastName(entity.getLastName());
            return repository.save(x);
        }).orElseGet(() -> {
            entity.setId(id);
            return repository.save(entity);
        });
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id){
        repository.deleteById(id);
    }


}
