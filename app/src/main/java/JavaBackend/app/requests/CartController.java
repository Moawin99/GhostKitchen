package JavaBackend.app.requests;

import JavaBackend.app.config.UserPrincliples;
import JavaBackend.app.model.CartItem;
import JavaBackend.app.model.CurrentUser;
import JavaBackend.app.model.Invoice;
import JavaBackend.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    MenuItemRepository itemRepository;
    @Autowired
    CartItemRepository cartItemRepository;

    @GetMapping("/cart")
    public List<CartItem> getCartItems(@CurrentUser UserPrincliples princliples){
        return userRepository.findById(princliples.getId()).get().getCart().getCartList();
    }

    @PutMapping("/cart/add/{id}")
    public ResponseEntity<?> addOneToCart(@CurrentUser UserPrincliples princliples,
                                          @PathVariable Long id ){
        User user = userRepository.findById(princliples.getId()).get();
        CartItem cartItem = new CartItem(itemRepository.findById(id).get());
        user.getCart().addOneToCart(cartItem);
        userRepository.save(user);
        return ResponseEntity.ok(cartItem.getName() + " added");
    }

    @PutMapping("/cart/remove/{id}")
    public ResponseEntity<?> removeFromCart(@CurrentUser UserPrincliples princliples,
                                            @PathVariable Long id){
        User temp = userRepository.findById(princliples.getId()).get();
        CartItem cartItem = cartItemRepository.findById(id).get();
        if(cartItemRepository.findById(id).get().getAmount() == 1){
            temp.getCart().removeFromCart(cartItem);
            cartItemRepository.delete(cartItem);
            userRepository.save(temp);
            cartItemRepository.delete(cartItem);
;
        }
        else {
            temp.getCart().removeFromCart(cartItem);
            userRepository.save(temp);
        }
        return ResponseEntity.ok(cartItem.getName() + " removed");
    }

    @PutMapping("/cart/checkout")
    public ResponseEntity<?> checkOut(@CurrentUser UserPrincliples princliples){
        double total = userRepository.findById(princliples.getId()).get().getCart().checkOut();
        User temp = userRepository.findById(princliples.getId()).get();
        Invoice invoice = new Invoice(temp);
        temp.getOrderHistory().add(invoice);
        userRepository.save(temp);
        return ResponseEntity.ok("your total is " + total);
    }
}
