const lrpath = "http://localhost:3000/listRoom"
const rootpath = "http://localhost:3000/"



/* To run this test is necessary to remove the DB
  from back-end an run test_game.py */

context("See the list of created room and select one to join", () =>{
  describe("User is not logged in", () => {
    it("try to join room", ()=>{
      cy.visit(lrpath)
      cy.get('h2')
      .contains('To play you need to be logged in')
    })
  })

  describe("User is logged in", () =>{
    it("want to see available rooms", ()=>{
      // login
      cy.visit(rootpath)
      cy.get('input[type=email]')
        .type('player1@email.com')
      cy.get('input[type=password')
        .type('Heladera65')
      cy.get('input[type=submit]').click()
      // display list room
      cy.get('button[id=join]').click()
      cy.get('p[id=title]')
        .contains('Select a room')
    })

      it("once a player is in list room, want to go back to home", () => {
        // login
        cy.visit(rootpath)
        cy.get('input[type=email]')
          .type('player1@email.com')
        cy.get('input[type=password')
          .type('Heladera65')
        cy.get('input[type=submit]').click()
        // display list room
        cy.get('button[id=join]').click()
        // go back
        cy.get('button[id=back]').click()
        cy.get('h1[id=welcome').contains('Hello player1')
      })

      it("Player1 create JoinTEST1 room and Player2 join", () =>{
        // login
        cy.visit(rootpath)
        cy.get('input[type=email]')
          .type('player1@email.com')
        cy.get('input[type=password')
          .type('Heladera65')
        cy.get('input[type=submit]').click()
        // create room and logout
        cy.get('button[id=create]').click()
        cy.get('input[id=inroomname]')
          .type('JoinTEST1')
        cy.get('input[type=submit]').click()
        cy.visit(rootpath)
        cy.get('button[id=logout]').click()

        // player2 login
        cy.get('input[type=email]')
          .type('player2@email.com')
        cy.get('input[type=password')
          .type('Heladera65')
        cy.get('input[type=submit]').click()

        // display list room
        cy.get('button[id=join]').click()

        // looks for room called JoinTEST1
        const roomtag = cy.get('div[id=JoinTEST1]')
          .contains('JoinTEST1')

        //enter to the room
        roomtag.get('button[id=JoinTEST1join]').click()
        cy.get('h2[id=title]').contains('Lobby')
      })
  })


})