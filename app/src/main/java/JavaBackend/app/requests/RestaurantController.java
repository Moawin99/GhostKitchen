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

    /**
     * This method returns all the current restaurants saved in the data base
     * @return List<Restaurant>
     */
    @GetMapping("/selection")
    public List<Restaurant> getAllRestaurants(){
        return restaurantRepository.findAll();
    }

    /**
     * This method returns all the current Menu items in the data base
     * @return List<MenuItem>
     */
    @GetMapping("/items")
    public List<MenuItem> getAllMenuItems(){
        return menuItemRepository.findAll();
    }

    /**
     * This method returns a restaurant based off id
     * @param id Long
     * @return A 200 Http Status
     */
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<?> getRestaurant(@PathVariable Long id){
        return ResponseEntity.ok(restaurantRepository.findById(id).get());
    }
}
