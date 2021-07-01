import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Button,
  TextInput,
  Switch,
  Vibration
} from 'react-native';
import store from './store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { setRate, selectTaxRate } from './taxRateSlice';
import { setEnabled, isEnabled } from './vibrationSlice';
import { Counter } from './Counter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddTaxButton } from './AddTaxButton';
import {subscribe} from './store';


const unsubscribe = subscribe('user.messages.count', state => {
  // do something
});



var first = '';
var second = '';
var symbol = '';
var last = '';
var memory = '';

window.tempRate = '';

const Stack = createStackNavigator();

function negate(str: string) {
  if (str !== '') {
    var temp = parseFloat(str);
    str = String(temp * -1);
  }

  return str;
}

function invert(str: string) {
  if (str !== '') {
    var temp = parseFloat(str);
    str = String(1 / temp);
  }

  return str;
}

function root(str: string) {
  if (str !== '') {
    var temp = parseFloat(str);
    str = String(Math.sqrt(temp));
  }

  return str;
}

function square(str: string) {
  if (str !== '') {
    var temp = parseFloat(str);
    str = String(Math.pow(temp, 2));
  }

  return str;
}

var updateOutput = function () {
  var output = first + ' ' + symbol + ' ' + second;
  this.setState({ value: output });
};

var updateMemory = function () {
  if (memory !== '') {
    this.setState({ memory: 'M' });
  } else {
    this.setState({ memory: '' });
  }
};

class CustomTextInput extends React.Component {
  state: { value: string };
  props: any;
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      value: '',
      memory: '',
    };

    updateOutput = updateOutput.bind(this);
    updateMemory = updateMemory.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 3, flexDirection: 'row', backgroundColor: 'grey' }}>
        <Text style={{ flex: 1, fontSize: 20, textAlign: 'left' }}>
          {this.state.memory}
        </Text>
        <Text style={{ flex: 15, fontSize: 40, textAlign: 'right' }}>
          {this.state.value}
        </Text>
      </View>
    );
  }
}

function add(strF, strS) {
  if (strF !== '' && strS !== '') {
    var f = parseFloat(strF);
    var s = parseFloat(strS);

    var n = f + s;

    return String(n);
  }
}

function multiply(strF, strS) {
  if (strF !== '' && strS !== '') {
    var f = parseFloat(strF);
    var s = parseFloat(strS);

    var n = f * s;

    return String(n);
  }
}

function divide() {
  symbol = '/';
  updateOutput();
}

function subtract(strF, strS) {
  if (strF !== '' && strS !== '') {
    var f = parseFloat(strF);
    var s = parseFloat(strS);

    var n = f - s;

    return String(n);
  }
}

function equals() {
  if (first !== '' && second !== '' && symbol !== '') {
    var f = parseFloat(first);
    var s = parseFloat(second);

    if (symbol === '+') {
      last = add(f, s);
    } else if (symbol === '-') {
      last = subtract(f, s);
    } else if (symbol === 'x') {
      last = multiply(f, s);
    } else if (symbol === '/') {
      last = String(f / s);
    }

    first = last;
    second = '';
    symbol = '';

    updateOutput();
  }
}

function btnTaxAdd(tax) {
  if (tax !== '') {
    var t = '';

    if (symbol === '') {
      if (first !== '') {
        t = multiply(tax, first);
        first = add(t, first);
      }
    } else {
      if (second !== '') {
        t = multiply(tax, second);
        second = add(t, second);
      }
    }

    updateOutput();
  }
}

function btnTaxSubtract(tax) {
  if (tax !== '') {
    var t = '';

    if (symbol === '') {
      if (first !== '') {
        t = multiply(tax, first);
        first = subtract(first, t);
      }
    } else {
      if (second !== '') {
        t = multiply(tax, second);
        second = subtract(second, t);
      }
    }

    updateOutput();
  }
}

function btnPlus() {
  symbol = '+';
  updateOutput();
}

function btnMinus() {
  symbol = '-';
  updateOutput();
}

function btnMultiply() {
  symbol = 'x';
  updateOutput();
}

function btn0() {
  if (symbol === '') {
    if (first !== '') {
      first += '0';
    }
  } else {
    if (second !== '') {
      second += '0';
    }
  }

  updateOutput();
}

function btn00() {
  if (symbol === '') {
    if (first !== '') {
      first += '00';
    }
  } else {
    if (second !== '') {
      second += '00';
    }
  }

  updateOutput();
}

function btnNumber(str: string) {
  

  if (symbol === '') {
    first += str;
  } else {
    second += str;
  }

  updateOutput();
}

function btnClear() {
  first = '';
  second = '';
  symbol = '';
  updateOutput();
}

function btnMemoryAdd() {
  var t = '0';
  if (memory !== '') {
    t = memory;
  }

  if (symbol === '') {
    if (first !== '') {
      memory = add(t, first);
    }
  } else {
    if (second !== '') {
      memory = add(t, second);
    }
  }

  updateMemory();
}

function btnMemorySubtract() {
  var t = '0';
  if (memory !== '') {
    t = memory;
  }

  if (symbol === '') {
    if (first !== '') {
      memory = subtract(t, first);
    }
  } else {
    if (second !== '') {
      memory = subtract(t, second);
    }
  }
}

function btnMemoryRecall() {
  if (memory !== '') {
    if (symbol === '') {
      first = memory;
    } else {
      second = memory;
    }
  }

  updateOutput();
}

function btnMemoryClear() {
  memory = '';
  updateMemory();
}

function btnBack() {
  if (second !== '') {
    second = second.substring(0, second.length - 1);
  } else if (symbol !== '') {
    symbol = '';
  } else if (first !== '') {
    first = first.substring(0, first.length - 1);
  }

  updateOutput();
}

function btnDecimal() {
  if (symbol === '') {
    if (!first.includes('.')) {
      if (first === '') {
        first += '0.';
      } else {
        first += '.';
      }
    }
  } else {
    if (!second.includes('.')) {
      if (second === '') {
        second += '0.';
      } else {
        second += '.';
      }
    }
  }
}

function btnNegate() {
  if (symbol === '') {
    first = negate(first);
  } else {
    second = negate(second);
  }

  updateOutput();
}

function btnInvert() {
  if (symbol === '') {
    first = invert(first);
  } else {
    second = invert(second);
  }

  updateOutput();
}

function percent(str) {
  var s = parseFloat(str);
  return String(s * 0.001);
}

function btnPercent() {
  if (second === '') {
    return;
  } else {
    second = percent(second);
  }

  updateOutput();
}

function btnSqrt() {
  if (symbol === '') {
    first = root(first);
  } else {
    second = root(second);
  }

  updateOutput();
}

function btnSquare() {
  if (symbol === '') {
    first = square(first);
  } else {
    second = square(second);
  }

  updateOutput();
}




function AbstractButton(props) {
  const [isVibrationEnabled, setVibrationEnabled] = useState(useSelector(isEnabled));

  const unsubscribe = subscribe('vibration.value', state => {
    setVibrationEnabled(state.vibration.value)    
  });

  const press = (props) => {
    if(isVibrationEnabled) { Vibration.vibrate(50) } 
    props.onPress()
  }
  
  return (
    <TouchableOpacity style={props.style} onPress={() => press(props)}>
      <Text style={props.textStyle}>{props.label}</Text>
    </TouchableOpacity>
  );
}

function NumberButton(props) {
  return (
    <AbstractButton
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5C6D70',
        padding: 10,
        margin: 1,
      }}
      onPress={props.onPress}
      label={props.label}
      textStyle={{ fontSize: 28 }}
    />
  );
}



function OperatorButton(props) {  
  return (
    <AbstractButton
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A2A5A1',
        padding: 10,
        margin: 1,
      }}
      onPress={props.onPress}
      label={props.label}
      textStyle={{ fontSize: 20 }}
    />
  );
}



function MemoryButton(props) {
  return (
    <AbstractButton
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5F9EA0',
        padding: 10,
        margin: 1,
      }}
      onPress={props.onPress}
      label={props.label}
    />
  );
}

function EqualsButton(props) {
  return (
    <AbstractButton
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 1,
        backgroundColor: '#F6CD13',
      }}
      onPress={equals}
      label="="
      textStyle={{ fontSize: 20 }}
    />
  );
}

function ClearButton(props) {
  return (
    <AbstractButton
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 1,
        backgroundColor: '#BC1033',
      }}
      onPress={props.onPress}
      label="C"
      textStyle={{ fontSize: 20 }}
    />
  );
}

function ShortButton(props) {
  return (
    <AbstractButton
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 1,
        backgroundColor: '#A2A5A1',
      }}
      onPress={props.onPress}
      label={props.label}
    />
  );
}

const rowStyle = {
  flex: 2,
  flexDirection: 'row',
};

const rowStyleShort = {
  flex: 1,
  flexDirection: 'row',
};

function MainScreen({ navigation, route }) {
  const [taxRate, setTaxRate] = useState(useSelector(selectTaxRate));

  const unsubscribe = subscribe('taxRate.value', state => {
    setTaxRate(state.taxRate.value)    
  });

  return (
    <View style={{ height: '100%', backgroundColor: 'grey' }}>
      <CustomTextInput />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <ShortButton
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        
        <ShortButton label="Tax-" onPress={() => btnTaxSubtract(taxRate)} />
        <ShortButton label="Tax+" onPress={() => btnTaxAdd(taxRate)} />
      </View>

      <View style={rowStyleShort}>
        <MemoryButton label="MC" onPress={btnMemoryClear} />
        <MemoryButton label="MR" onPress={btnMemoryRecall} />
        <MemoryButton label="M+" onPress={btnMemoryAdd} />
        <MemoryButton label="M-" onPress={btnMemorySubtract} />
      </View>

      <View style={rowStyle}>
        <ClearButton onPress={btnClear}/>
        <OperatorButton label="" onPress={() => {}}/>
        <OperatorButton label="x&sup2;" onPress={btnSquare} />
        <OperatorButton label="<" onPress={btnBack} />
      </View>

      <View style={rowStyle}>
        <OperatorButton label="+/-" onPress={btnNegate} />
        <OperatorButton label="1/x" onPress={btnInvert} />
        <OperatorButton label="&radic;" onPress={btnSqrt} />
        <OperatorButton label="/" onPress={divide} />
      </View>

      <View style={rowStyle}>
        <NumberButton label="7" onPress={() => btnNumber('7')} />
        <NumberButton label="8" onPress={() => btnNumber('8')} />
        <NumberButton label="9" onPress={() => btnNumber('9')} />
        <OperatorButton label="x" onPress={btnMultiply} />
      </View>

      <View style={rowStyle}>
        <NumberButton label="4" onPress={() => btnNumber('4')} />
        <NumberButton label="5" onPress={() => btnNumber('5')} />
        <NumberButton label="6" onPress={() => btnNumber('6')} />
        <OperatorButton label="-" onPress={btnMinus} />
      </View>

      <View style={rowStyle}>
        <NumberButton label="1" onPress={() => btnNumber('1')} />
        <NumberButton label="2" onPress={() => btnNumber('2')} />
        <NumberButton label="3" onPress={() => btnNumber('3')} />
        <OperatorButton label="+" onPress={btnPlus} />
      </View>

      <View style={rowStyle}>
        <NumberButton label="00" onPress={() => btnNumber('00')} />
        <NumberButton label="0" onPress={() => btnNumber('0')} />
        <NumberButton label="." onPress={btnDecimal} />
        <EqualsButton />
      </View>
    </View>
  );
}

class TextField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 20,
          justifyContent: 'flex-start',
        }}>
        <Text style={{ flex: 1 }}>{this.props.label}</Text>
        <TextInput
          onChangeText={this.props.onChangeText}
          style={{ borderWidth: 1, flex: 1 }}
          value={this.props.value}
        />
      </View>
    );
  }
}

function SettingsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [taxRate, setTaxRate] = useState(useSelector(selectTaxRate));
  const [isVibrationEnabled, setVibrationEnabled] = useState(
    useSelector(isEnabled)
  );

  const toggleVibration = () =>
    setVibrationEnabled((previousState) => !previousState);

  const butter = () => {
    dispatch(setRate(taxRate));
    dispatch(setEnabled(isVibrationEnabled));
  };

  return (
    <View style={{ height: '100%', justifyContent: 'space-between' }}>
      <View>
        <TextField
          label="Tax Rate(%)   "
          onChangeText={setTaxRate}
          value={taxRate}
        />

        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            justifyContent: 'flex-start',
          }}>
          <Text style={{ flex: 1 }}>Vibration</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isVibrationEnabled ? '#f5dd4b' : '#f4f3f4'}
            //ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVibration}
            value={isVibrationEnabled}
          />
        </View>
      </View>

      <Button
        color="#A2A5A1"
        onPress={() => {
          butter();
          navigation.navigate('Home', { taxRate: taxRate });
        }}
        title="Save"
      />
    </View>
  );
}

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#A2A5A1',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{ title: '' }}
            initialParams={{ taxRate: null, vibration: null }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
