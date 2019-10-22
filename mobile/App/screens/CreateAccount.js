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
import { reviewApi, saveAuthToken } from "../util/api";

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
    fname: "",
    lname: "",
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

    // authenticate user
    reviewApi("/create-account", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        fname: this.state.fname,
        lname: this.state.lname,
        password: this.state.password,
        repassword: this.state.repassword
      })
    })
      .then(response => {
        // save login info
        return saveAuthToken(response.result.token);
      })
      .then(() => {
        // go to info screen
        this.props.navigation.navigate("Information");
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
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
          onChangeText={fname => this.setState({ fname })}
          value={this.state.fname}
          autoCapitalize="none"
        />
        <TextField
          label="Last Name"
          placeholder="Doe"
          onChangeText={lname => this.setState({ lname })}
          value={this.state.lname}
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
