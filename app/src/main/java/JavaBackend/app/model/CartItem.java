package JavaBackend.app.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class CartItem extends Item{

    private int amount;

    public CartItem(int amount){
        this.amount = amount;
    }

    public CartItem(){
        this.amount = 1;
    }

    public CartItem(MenuItem item){
        this.setName(item.getName());
        this.setDescription(item.getDescription());
        this.setPrice(item.getPrice());
        this.setRestaurant(item.getRestaurant());
        amount = 1;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void increaseAmount(){
        amount++;
    }
}
