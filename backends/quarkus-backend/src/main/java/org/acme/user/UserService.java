package org.acme.user;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class UserService {
    @Inject
    private UserRepository userRepository;

    public User createUser() {
        User user = new User();
        userRepository.persist(user);
        return user;
    }
}
