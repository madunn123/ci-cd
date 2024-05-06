/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */


describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/*');
  });
  it('should display login page correctly', () => {

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^login$/).should('be.visible');
  })

  it('should display alert when username is empty', () => {
    cy.get('button').contains(/^login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  })

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testuser');
 
    cy.get('button').contains(/^login$/).click();
 
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi username
    cy.get('input[placeholder="Email"]').type('testuser');
 
    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');
 
    // menekan tombol Login
    cy.get('button').contains(/^login$/).click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="Email"]').type('password123@gmail.com');
 
    // mengisi password
    cy.get('input[placeholder="Password"]').type('password123');
 
    // menekan tombol Login
    cy.get('button').contains(/^login$/).click();
 
    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav').contains(/^forum diskusi$/).should('be.visible');
    // cy.get('button').contains('Sign out').should('be.visible');
  });
})
