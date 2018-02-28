import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      inputJSON: {}
    }
    this.loadInput = this.loadInput.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
  }

  componentWillMount() {
    //Load saved data...
    let savedData = localStorage.getItem("savedJSON");
    let defaultData =
`[
  {
    "test1.1": "AAA",
    "test1.2": "AAA",
    "test1.3": "AAA"
  },
  {
    "test2.1": "BBB"
  },
  {
    "test3.1": "CCC",
    "test3.2": "CCC",
    "test3.3": "CCC"
  }
]`;

    if(savedData){
      this.setState ({
        inputText: savedData
      });
    } else {
      this.setState ({
        inputText: defaultData
      });
    }
  }

  componentDidMount() {
    // console.log('App mounted...');

    //Event listeners...
    const loadBtn = document.getElementById('LoadBtn');
    const saveBtn = document.getElementById('SaveBtn');
    loadBtn.addEventListener('click', () => {this.loadInput();});
    saveBtn.addEventListener('click', () => {this.saveInput();});
  }

  loadInput(){
    let textInput = document.getElementById("inputArea").value;
    let parsedInput;

    try {
      parsedInput = JSON.parse(textInput);
    } catch (e) {
      parsedInput = {"error": "Bad JSON"};
    }

    this.setState ({
      inputText: textInput,
      inputJSON: parsedInput
    });

    // console.log(this.state.inputText);
    // console.log(this.state.inputJSON);
  }

  saveInput(){
    localStorage.setItem("savedJSON", this.state.inputText);
  }

  parseJSON(obj){
    let output = "";

    for(let key in obj){

      if(obj[key] !== null && typeof obj[key] === 'object') {
        // console.log("Obj-" + key);
        output += "Obj-" + key + "\n";
        output += this.parseJSON(obj[key]);
      } else {
        // console.log("Key: " + key);
        // console.log("Value: " + obj[key]);
        output += "Key: " + key + "\n";
        output += "Value: " + obj[key] + "\n";
      }
    }

    // console.log(output);
    return output;
  }

  render() {
    let outputText = this.parseJSON(this.state.inputJSON);
    // console.log(outputText);

    return (
      <div>
        <div className='container'>
          <textarea id='inputArea' defaultValue={this.state.inputText} />
          <textarea id='outputArea'value={outputText} />
        </div>
        <p className='instructions'>
          Instructions:
          <br />Edit JSON on the left side, when ready press ENTER to parse it.
          <br />You are able to save this JSON for future reference by pressing SAVE.
        </p>
        <hr />
        <button id='LoadBtn'>ENTER</button>
        <button id='SaveBtn'>SAVE</button>
      </div>
    );
  }
};

// ========================================

ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);
