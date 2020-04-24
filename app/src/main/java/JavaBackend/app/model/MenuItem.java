package JavaBackend.app.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class MenuItem extends Item{
    public MenuItem(){}

    public MenuItem(String name, String description, double price, Restaurant restaurant){
        super(name, description, price, restaurant);
    }
}
