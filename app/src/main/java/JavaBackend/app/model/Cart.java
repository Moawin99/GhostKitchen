package JavaBackend.app.model;

import javax.persistence.*;
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

    public boolean doesContain(CartItem item){
        for (CartItem x : cart) {
            if (x.getName().equals(item.getName()) &
                    x.getPrice() == item.getPrice() &
                    x.getDescription().equals(item.getDescription())) {
                return true;
            }
        }
        return false;
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

    public List<CartItem> getCartList() {
        return cart;
    }
}
