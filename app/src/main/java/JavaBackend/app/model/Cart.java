package JavaBackend.app.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_ID")
    private List<CartItem> cart;

    public void addOneToCart(CartItem item){
        for(CartItem cartItem : cart){
            if(!item.getRestaurant().getId().equals(cartItem.getRestaurant().getId())){
                cart.clear();
                break;
            }
        }
        if(findByName(item) == null){
            cart.add(item);
        }
        else{
          CartItem tempItem = findByName(item);
          tempItem.increaseAmount();
        }
    }

    public void removeFromCart(CartItem item){
        CartItem tempItem = findByName(item);
        if(tempItem.getAmount() == 1){
            cart.remove(tempItem);
        }
        else {
            tempItem.setAmount(tempItem.getAmount() - 1);
        }
    }

    public void addMultipleToCart(CartItem item, int amount){
        item.setAmount(amount);
        cart.add(item);
    }

    public CartItem findByName(CartItem item){
        CartItem tempItem = null;
        for(CartItem x : cart){
            if (x.getName().equals(item.getName()) &
                    x.getPrice() == item.getPrice() &
                    x.getDescription().equals(item.getDescription())) {
                tempItem = x;
                return tempItem;
            }
        }
        return null;
    }

    public Double checkOut(){
        double total = 0;
        for (CartItem cartItem: cart){
            total += (cartItem.getAmount() * cartItem.getPrice());
        }
        total += (total * .08);
        BigDecimal bd = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP);
        total = bd.doubleValue();
        return total;
    }

    public List<CartItem> getCartList() {
        return cart;
    }
}
