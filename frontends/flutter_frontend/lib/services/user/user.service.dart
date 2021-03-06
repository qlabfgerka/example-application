import 'dart:convert';

import 'package:flutter_frontend/models/user/user.dart';
import 'package:http/http.dart' as http;

class UserService {
  final String hostname = "http://10.0.2.2:3000";

  Future<User> createUser() async {
    final response = await http.post(Uri.parse('$hostname/user'));

    return handleResponse(response);
  }

  User handleResponse(http.Response response) {
    if (response.statusCode == 201) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load User');
    }
  }
}
