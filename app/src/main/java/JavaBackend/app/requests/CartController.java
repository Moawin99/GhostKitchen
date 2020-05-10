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
    @Autowired
    InvoiceRepository invoiceRepository;

    /**
     *This method gets the current users cart
     * @param princliples User Principles
     * @return A List of CartItems
     */
    @GetMapping("/cart")
    public List<CartItem> getCartItems(@CurrentUser UserPrincliples princliples){
        return userRepository.findById(princliples.getId()).get().getCart().getCartList();
    }

    /**
     * This method takes in the id of a menu item and converts it to a cart item.
     * After converting it to a cart item it adds the item to the current users cart
     * @param princliples User Principles
     * @param id Long
     * @return A 200 Http Status
     */
    @PutMapping("/cart/add/{id}")
    public ResponseEntity<?> addOneToCart(@CurrentUser UserPrincliples princliples,
                                          @PathVariable Long id ){
        User user = userRepository.findById(princliples.getId()).get();
        CartItem cartItem = new CartItem(itemRepository.findById(id).get());
        user.getCart().addOneToCart(cartItem);
        userRepository.save(user);
        return ResponseEntity.ok(cartItem.getName() + " added");
    }

    /**
     * This method takes the id of a cart item and removes it from the current users cart
     * @param princliples User Principles
     * @param id Long
     * @return A 200 Http Status
     */
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

    /**
     * This method gets the current user logged in and adds up all the cart item prices and returns
     * an Http Status with the total in the body. The method also creates an invoice and saves it to
     * the current users order history
     * @param princliples User Principles
     * @return A 200 Http Status with a Double in the body
     */
    @PutMapping("/cart/checkout")
    public ResponseEntity<?> checkOut(@CurrentUser UserPrincliples princliples){
        double total = userRepository.findById(princliples.getId()).get().getCart().checkOut();
        User temp = userRepository.findById(princliples.getId()).get();
        Invoice invoice = new Invoice(temp);
        temp.getOrderHistory().add(invoice);
        temp.getCart().getCartList().clear();
        userRepository.save(temp);
        return ResponseEntity.ok("your total is " + total);
    }

    /**
     *This method returns the current users cart total
     * @param princliples User Principles
     * @return A 200 Http Status with a Double in the body
     */
    @GetMapping("/cart/total")
    public ResponseEntity<?> getTotal(@CurrentUser UserPrincliples princliples){
       double total = userRepository.findById(princliples.getId()).get().getCart().checkOut();
       return ResponseEntity.ok(total);
    }

    /**
     * This method returns all of the current users' invoices
     * @param princliples User Principles
     * @return A 200 Http Status
     */
    @GetMapping("/cart/invoices")
    public ResponseEntity<?> getPastOrders(@CurrentUser UserPrincliples princliples){
        List<Invoice> orderHistory = userRepository.findById(princliples.getId()).get().getOrderHistory();
        return ResponseEntity.ok(orderHistory);
    }

}
