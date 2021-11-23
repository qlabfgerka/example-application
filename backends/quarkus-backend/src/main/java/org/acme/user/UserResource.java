package org.acme.user;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    private UserService userService;

    @POST
    @Transactional
    public User createUser() {
        return this.userService.createUser();
    }
}
