import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_frontend/models/task/task.dart';

typedef IntCallback = void Function(int val);
typedef TaskCallback = void Function(Task task);

class TaskCard extends StatelessWidget {
  final AsyncSnapshot<List<Task>> _tasks;
  final IntCallback _deleteCallback;
  final TaskCallback _editCallback;

  const TaskCard(this._tasks, this._deleteCallback, this._editCallback,
      {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        shrinkWrap: true,
        padding: const EdgeInsets.all(8),
        itemCount: _tasks.data!.length,
        itemBuilder: (context, index) {
          return Center(
            child: Card(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  ListTile(
                    title: Text(_tasks.data![index].title),
                    subtitle: Text(_tasks.data![index].description),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      TextButton(
                        child: const Text('EDIT'),
                        onPressed: () {
                          _editCallback(_tasks.data![index]);
                        },
                      ),
                      const SizedBox(width: 8),
                      TextButton(
                        child: const Text('DELETE'),
                        onPressed: () {
                          _deleteCallback(_tasks.data![index].id as int);
                        },
                      ),
                      const SizedBox(width: 8),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
