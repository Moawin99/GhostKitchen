package JavaBackend.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "invoice")
public class Invoice {

    public Invoice(){}

    public Invoice(User user){
        this.name = user.getFirstName() + " " + user.getLastName();
        this.streetName = user.getStreetName();
        this.city = user.getCity();
        this.cart = user.getCart();
        this.total = user.getCart().checkOut();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "st_name")
    private String streetName;

    @Column(name = "city")
    private String city;

    @Column(name = "total")
    private double total;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

}
