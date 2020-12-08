import * as Color from './colors';
import * as Spacing from './spacing';

export const base = {
    borderRadius: 10,
    margin: 10
}

export const shadow = {
    shadowColor: Color.shadow,
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

export const container = {
    backgroundColor: Color.background
}


// app.js
export const header = {
    backgroundColor: Color.header,
    height: 70
}


// Register.js, Login.js
export const button = {
    ...base,
    ...shadow,
    alignItems: 'center',
    backgroundColor: Color.component,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 150,
    
}
export const input = {
    ...base,
    backgroundColor: Color.input,
    paddingLeft: 10,
    width: 250,
}
export const form = {
    alignItems: 'center',
    padding: 50
}


// Register.js
export const view = {
    ...base,
    ...shadow,
    backgroundColor: Color.component,
    padding: 15,
    alignItems: 'center'
}



// ChatPreview.js
export const group = {
    backgroundColor: Color.component,
    height: 70,
    width: 350,
    ...shadow
}
export const groupCard = {
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto'
}
export const groupBody = {
    alignItems: 'center',
}
export const groupNames = {
    fontSize: 25,
    color: Color.font
}


// ChatView.js
export const msgFooter = {
    height: 70,
    backgroundColor: Color.component
}
export const msgInput = {
    backgroundColor: Color.input,
    height: 40,
    width: 320,
    marginLeft: 15,
    borderRadius: 10,
    padding: 3
}
export const dialog = {
    backgroundColor: Color.component
}
export const dialogBtnCont = {
    flexDirection: 'row',
}
export const dialogBtn = {
    ...button,
    width: 120,
}

// Message.js
export const msg = {
    minHeight: 60,
    backgroundColor: Color.black,
    elevation: 0
}
export const msgTop = {
    backgroundColor: Color.sender,
    height: 30,
}
export const msgBody = {
   minHeight: 30,
}
export const msgBottom = {
    backgroundColor: Color.message,
    padding: 3
}
export const msgText = {
    color: Color.font
}
export const msgSender = {
    color: Color.font
}

//login.js
export const title = {
    fontSize: Spacing.largest,
    margin: 15
}


export const texts = {
    fontSize: Spacing.base,
    color: Color.font,
    textAlign: 'center'
}

export const userTexts = {
    ...texts,
    fontSize: 17,
    margin: 5
}

export const icons = {
    color: Color.icon
}

export const userLogged = {
    ...texts,
    color: Color.black
}