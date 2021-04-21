/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />
import { mount } from '@cypress/vue';
import path from 'path';
import PromtCard from './PromtCard.vue';

const selectors = {
  card: '[data-test-id="promt-card"]',
  image: '[data-test-id="promt-card__image"]',
  name: '[data-test-id="promt-card__name"]',
  contactInfo: '[data-test-id="promt-card__contacts"]',
};
const name = 'Elvis Presly';
const contactInfo = 'elvis@yahoo.com';

describe('PromtCard component', () => {
  it('works', () => {
    const image = path.resolve(__dirname, '../../tests/fixtures/default-picture1.png');

    mount(PromtCard, { propsData: { name, contactInfo, image } });
    cy.get(selectors.card)
      .should('exist');
    cy.get(selectors.name).contains(name);
    cy.get(selectors.contactInfo).contains(contactInfo);
    cy.get(selectors.image)
      .should('have.attr', 'src', image);
  });

  it('has default image', () => {
    const image = 'http://some-other-address.com/image.png';

    mount(PromtCard, { propsData: { name, contactInfo, image } });
    cy.get(selectors.image)
      .should('have.attr', 'src')
      .and('not.equal', image);
  });
});
