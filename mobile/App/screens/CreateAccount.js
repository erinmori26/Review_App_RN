import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";

import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { reviewApi } from "../util/api";

const styles = StyleSheet.create({
  textBlock: {
    marginTop: 20
  },
  text: {
    fontSize: 18,
    color: "#969696",
    textAlign: "center",
    marginBottom: 2
  },
  link: {
    textDecorationLine: "underline"
  }
});

export default class CreateAccount extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repassword: "",
    error: ""
  };

  handleSubmit = () => {
    this.setState({ error: "" });

    ////////// CHECK PASSWORDS ////////////
    if (this.state.password != this.state.repassword) {
      this.setState({
        error: "Passwords do not match!",
        password: "",
        repassword: ""
      });
    }
    //////////////////////////////////////

    ////////// CREATE NEW ACCOUNT ////////////
    reviewApi("/create-account", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password
      })
    })
      .then(() => {
        // go to login screen
        this.props.navigation.navigate("SignIn");
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
    ///////////////////////////////////////////
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        />
        <TextField
          label="First Name"
          placeholder="John"
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
          autoCapitalize="none"
        />
        <TextField
          label="Last Name"
          placeholder="Doe"
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          autoCapitalize="none"
        />
        <TextField
          label="Confirm Password"
          secureTextEntry
          onChangeText={repassword => this.setState({ repassword })}
          value={this.state.repassword}
          autoCapitalize="none"
        />
        <ErrorText text={this.state.error} />
        <Button text="Submit" onPress={this.handleSubmit} />
        <View style={styles.textBlock}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={[styles.text, styles.link]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
