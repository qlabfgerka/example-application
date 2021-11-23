package org.acme.task;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/task")
@Produces(MediaType.APPLICATION_JSON)
public class TaskResource {
    @Inject
    private TaskService taskService;

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Task createTask(TaskAndUserIDWrapper wrapper) {
        return this.taskService.createTask(wrapper.getTask(), wrapper.getUserId());
    }

    @GET
    @Path("{id}")
    public List<Task> getTasks(@PathParam("id") Long id) {
        return this.taskService.getTasks(id);
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public void removeTask(@PathParam("id") Long id) {
        this.taskService.removeTask(id);
    }

    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Task editTask(TaskAndUserIDWrapper wrapper) {
        return this.taskService.editTask(wrapper.getTask());
    }
}
