import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_frontend/models/task/task.dart';
import 'package:flutter_frontend/services/task/task.service.dart';
import 'package:flutter_frontend/services/user/user.service.dart';
import 'package:flutter_frontend/widgets/task_card.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final TaskService taskService = TaskService();
  final UserService userService = UserService();
  Future<List<Task>>? tasks;

  @override
  void initState() {
    super.initState();
    _setup();
  }

  void _setup() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getInt('USER_ID') == null) {
      prefs.setInt('USER_ID', (await userService.createUser()).id as int);
    }
    tasks = taskService.getTasks(prefs.getInt('USER_ID') as int);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
      ),
      body: FutureBuilder<List<Task>>(
        future: tasks,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return TaskCard(snapshot, (val) => onDeletePress(val));
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          }
          return const CircularProgressIndicator();
        },
      ),
    );
  }

  void onDeletePress(val) {
    setState(() {
      taskService.removeTask(val);
      _setup();
    });
  }
}
