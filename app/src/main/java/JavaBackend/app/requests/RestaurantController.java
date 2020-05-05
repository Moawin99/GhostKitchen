package JavaBackend.app.requests;

import JavaBackend.app.model.MenuItem;
import JavaBackend.app.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController {

    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    MenuItemRepository menuItemRepository;

    @GetMapping("/selection")
    public List<Restaurant> getAllRestaurants(){
        return restaurantRepository.findAll();
    }

    @GetMapping("/items")
    public List<MenuItem> getAllMenuItems(){
        return menuItemRepository.findAll();
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<?> getRestaurant(@PathVariable Long id){
        return ResponseEntity.ok(restaurantRepository.findById(id).get());
    }
}
