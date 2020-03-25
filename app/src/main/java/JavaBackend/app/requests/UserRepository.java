package JavaBackend.app.requests;

import JavaBackend.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User getByFirstNameAndLastName(String firstName, String lastName);

    User getByUserName(String userName);

    boolean existsByUserName(String userName);
}
