package requests;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepository repository;

    @GetMapping("/user")
    public List<User> findAll(){
        return repository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User entity){
        return repository.save(entity);
    }


}
