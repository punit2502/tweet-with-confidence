import React from 'react'
import randomize from 'randomatic'

import './style.scss'

// Comment: This is the  original Tweet in which we want to add four random characters and also share it on twitter. We have declared it here because this variable will be used in both if and else statemnet
let originalTweetInTextArea
let randomString

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonName: 'Next',
      textInTextArea: '',
      textAreaMaxLength: 280,
      showInputBox: true,
    }
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this)
  }

  // Comment: Import jquery and bootstarp
  // TODO: Find out a better place to import these. Maybe while importing other scripts?
  componentDidMount() {
    global.jQuery = global.$ = require('jquery')
    require('bootstrap')
    var $setter = $('textarea')
    $setter.siblings('button').css('max-width', $setter.width() - 90 + 'px')
  }

  // Comment: We change textInTextArea state every time user inputs a character because we are not sure when user will click 'Next' button hence we need to stay update
  //TODO: Maybe I am wrong? Rethink this
  handleTextAreaChange(event) {
    this.setState({ textInTextArea: event.target.value })
  }

  handleNextButtonClick() {
    if (this.state.buttonName === 'Next') {
      // Comment: In this line we set value for original tweet
      originalTweetInTextArea = this.state.textInTextArea

      // Comment: I think this is self explanatory. Here we generate four random character to be inserted in original tweet
      randomString = randomize('a', 4)
      const randomStringCharacterOne = randomString.charAt(0)
      const randomStringCharacterTwo = randomString.charAt(1)
      const randomStringCharacterThree = randomString.charAt(2)
      const randomStringCharacterFour = randomString.charAt(3)

      // TODO: Find out performace wise can we replace randomatic here?
      const lengthOfOriginalTweet = originalTweetInTextArea.length
      const positionOne = Math.ceil(Math.random() * lengthOfOriginalTweet)
      const positionTwo = Math.ceil(Math.random() * lengthOfOriginalTweet)
      const positionThree = Math.ceil(Math.random() * lengthOfOriginalTweet)
      const positionFour = Math.ceil(Math.random() * lengthOfOriginalTweet)

      /* Comment:
      In the below lines, we add random charters to original tweet at positions we got from above lines.

      How it works? Lets see an example:
      const a = 'I wan an apple'
      const b ='t'
      const position = 5
      a.slice(0,position) will output 'I wan'
      a.slice(position) will output ' an apple'
      [a.slice(0,position), b, a.slice(position)].join('') will output 'I want an apple'

      Note: afterAddingPOne == After Adding character at positionOne. Our final requried output here is afterAddingPFour, before this all the characters have been added.
    */

      const afterAddingPOne = [
        originalTweetInTextArea.slice(0, positionOne),
        randomStringCharacterOne,
        originalTweetInTextArea.slice(positionOne),
      ].join('')
      const afterAddingPTwo = [
        afterAddingPOne.slice(0, positionTwo),
        randomStringCharacterTwo,
        afterAddingPOne.slice(positionTwo),
      ].join('')
      const afterAddingPThree = [
        afterAddingPTwo.slice(0, positionThree),
        randomStringCharacterThree,
        afterAddingPTwo.slice(positionThree),
      ].join('')
      const afterAddingPFour = [
        afterAddingPThree.slice(0, positionFour),
        randomStringCharacterFour,
        afterAddingPThree.slice(positionFour),
      ].join('')

      this.setState({
        buttonName: 'Tweet',
        textAreaMaxLength: 284,
        textInTextArea: afterAddingPFour,
        showInputBox: false,
      })
    } else {
      const valueInRandomCharInputArray = [
        this.state.valueInRandomCharInput,
      ][0].split('')
      const randomStringArray = randomString.split('')

      const isSame = () =>
        valueInRandomCharInputArray.length === randomStringArray.length &&
        valueInRandomCharInputArray.sort().every(function(value, index) {
          return value === randomStringArray.sort()[index]
        })

      if (isSame() === true) {
        window.open(
          `https://twitter.com/intent/tweet?text=${originalTweetInTextArea}`
        )
      } else alert('Someting is incorrect')
    }
  }

  render() {
    const textAreaColsFromScreenAvailableWidth = () => {
      if ('undefined' != typeof screen) return screen.availWidth > 480 ? 50 : 35
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <textarea
              rows="4"
              cols={textAreaColsFromScreenAvailableWidth()}
              value={this.state.textInTextArea}
              maxLength={this.state.textAreaMaxLength}
              placeholder="What's happening?"
              onChange={this.handleTextAreaChange}
            />
            <br />
            <input
              type="text"
              id="randomCharInput"
              onChange={e =>
                this.setState({ valueInRandomCharInput: e.target.value })
              }
              hidden={this.state.showInputBox}
            />
            <br /> <br />
            <button
              className="btn btn-outline-primary btn-block btn-outline-primary"
              onClick={this.handleNextButtonClick}
            >
              {this.state.buttonName}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
