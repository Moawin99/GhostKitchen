package JavaBackend.app.requests;

import JavaBackend.app.model.Role;
import JavaBackend.app.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleName roleName);
}
