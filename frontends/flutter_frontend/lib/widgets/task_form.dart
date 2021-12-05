import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_frontend/models/task/task.dart';

typedef TaskCallback = void Function(Task task);

class TaskForm extends StatefulWidget {
  final TaskCallback _callback;
  final Task? _edit;

  const TaskForm(this._callback, this._edit, {Key? key}) : super(key: key);

  @override
  State<TaskForm> createState() => _TaskFormState();
}

class _TaskFormState extends State<TaskForm> {
  final _formKey = GlobalKey<FormState>();
  final Task _task = Task('', '');

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Container(
        margin: const EdgeInsets.only(left: 20.0, right: 20.0, top: 15.0),
        child: Column(
          children: [
            const Text(
              'Create Task',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: TextFormField(
                validator: (value) {
                  if (value!.isEmpty) {
                    return "Enter a task title.";
                  }
                },
                initialValue: widget._edit != null ? widget._edit!.title : '',
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Task title',
                ),
                onSaved: (val) => setState(() => _task.title = val!),
              ),
            ),
            TextFormField(
              validator: (value) {
                if (value!.isEmpty) {
                  return "Enter a task description.";
                }
              },
              initialValue:
                  widget._edit != null ? widget._edit!.description : '',
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Task description',
              ),
              onSaved: (val) => setState(() => _task.description = val!),
            ),
            ElevatedButton(
                onPressed: () {
                  final form = _formKey.currentState;
                  if (form!.validate()) {
                    form.save();
                    if (widget._edit != null) {
                      _task.id = widget._edit!.id;
                    }
                    widget._callback(_task);
                  }
                },
                child: Text(widget._edit != null ? "EDIT" : "CREATE"))
          ],
        ),
      ),
    );
  }
}
