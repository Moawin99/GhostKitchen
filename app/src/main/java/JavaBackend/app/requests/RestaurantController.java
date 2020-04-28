package JavaBackend.app.requests;

import JavaBackend.app.model.MenuItem;
import JavaBackend.app.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
