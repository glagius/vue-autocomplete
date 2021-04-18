/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />
import { mount } from '@cypress/vue';
import SearchField from './SearchField.vue';

const searchField = '[data-test-id="search__field"]';
const searchText = 'Some User Name';

describe('SearchField component', () => {
  it('works', () => {
    const spy = cy.spy();
    mount(SearchField);
    cy.get(searchField).should('exist').then(() => {
      Cypress.vue.$on('search', spy);
    });
    cy.get(searchField)
      .type(searchText)
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(spy).not.called;
      });
    cy.get(searchField)
      .clear()
      .type(searchText)
      .wait(1000)
      .then(() => {
        expect(spy).to.be.calledWith(searchText);
      });
  });
});
