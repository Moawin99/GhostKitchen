package JavaBackend.app.config;

import JavaBackend.app.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserPrincliples implements UserDetails {

    Long Id;
    String userName;
    String password;
    Collection<? extends GrantedAuthority> authorities;

    public UserPrincliples(Long id, String userName, String password, Collection<? extends GrantedAuthority> authorities) {
        Id = id;
        this.userName = userName;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincliples create(User entity) {
        List<GrantedAuthority> authorityList = entity.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name())
                ).collect(Collectors.toList());
        return new UserPrincliples(entity.getId(), entity.getUserName(), entity.getPassword(), authorityList);
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
