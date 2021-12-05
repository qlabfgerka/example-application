import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_frontend/models/task/task.dart';
import 'package:flutter_frontend/screens/edit_task/edit_task.dart';
import 'package:flutter_frontend/services/task/task.service.dart';
import 'package:flutter_frontend/services/user/user.service.dart';
import 'package:flutter_frontend/widgets/task_card.dart';
import 'package:flutter_frontend/widgets/task_form.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final TaskService taskService = TaskService();
  final UserService userService = UserService();
  late int userId;
  Future<List<Task>>? tasks;
  Task? _edit;

  @override
  void initState() {
    super.initState();
    _setup();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text('Tasks'),
      ),
      body: Column(children: [
        TaskForm((val) => onCreateTask(val), _edit),
        FutureBuilder<List<Task>>(
          future: tasks,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return TaskCard(snapshot, (val) => onDeletePress(val),
                  (val) => onEditPress(val));
            } else if (snapshot.hasError) {
              return Text('${snapshot.error}');
            }
            return const CircularProgressIndicator();
          },
        ),
      ]),
    );
  }

  void _setup() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getInt('USER_ID') == null) {
      prefs.setInt('USER_ID', (await userService.createUser()).id as int);
    }
    userId = prefs.getInt('USER_ID') as int;
    getTasks();
  }

  void onDeletePress(val) {
    taskService.removeTask(val);
    getTasks();
  }

  void onEditPress(val) {
    Navigator.push(context,
            MaterialPageRoute(builder: (context) => EditTask(task: val)))
        .then((_) => getTasks());
  }

  void onCreateTask(val) {
    taskService.createTask(val, userId);
    getTasks();
  }

  void getTasks() async {
    setState(() {
      tasks = taskService.getTasks(userId);
    });
  }
}
