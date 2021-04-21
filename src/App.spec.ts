/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />
import { mount } from '@cypress/vue';
import path from 'path';
import App from './App.vue';
import { UserAvatar, UserInfo } from './models';
import { loader, imagesUrl, usersUrl } from './services/api-requests';

type FakeAvatars = Pick<UserAvatar, 'id' | 'url'>[];

const fakeUsersLoader = (
  users: UserInfo[] | [],
  interval: number,
  failed: boolean,
): Promise<UserInfo[] | Error> => new Promise((res, rej) => {
  setInterval(() => (failed
    ? rej(new Error('Failed request'))
    : res(users)), interval);
});
const fakeAvatarLoader = (
  avatars: FakeAvatars | [],
  interval: number,
  failed: boolean,
): Promise<FakeAvatars | Error> => new Promise((res, rej) => {
  setInterval(() => (failed
    ? rej(new Error('Failed request'))
    : res(avatars)), interval);
});

describe('AutoComplete component', () => {
  it('works with fake data', () => {
    const users = [
      {
        id: 0,
        name: 'Samuel',
        email: 'sam@gmail.com',
      },
      {
        id: 1,
        name: 'El',
        email: 'some-huge-email-address@yahoo.com',
      },
      {
        id: 2,
        name: 'Ol',
        email: 'someOtherEmail@dot.com',
      },
    ];
    const avatars = [
      {
        id: 0,
        url: path.resolve(__dirname, '../tests/fixtures/default-picture1.png'),
      },
      {
        id: 1,
        url: path.resolve(__dirname, '../tests/fixtures/default-picture2.png'),
      },
    ];
    const propsData = {
      dataLoader: () => fakeUsersLoader(users, 2000, false),
      imagesLoader: () => fakeAvatarLoader(avatars, 1500, false),
    };
    mount(App, { propsData });
    cy.get('fieldset').should('exist');
    cy.get('[data-test-id="search__field"]')
      .type('el')
      .wait(2500)
      .get('[data-test-id="promt-card"]')
      .should('have.length', 2)
      .first()
      .click()
      .get('[data-test-id="promt-card"]')
      .should('not.exist')
      .get('[data-test-id="search__field"]')
      .should('have.value', 'Samuel');
  });
  // FIXME: Only for test-work. Don't do that in prod
  it('works with real data', () => {
    const propsData = {
      dataLoader: () => loader(usersUrl),
      imagesLoader: () => loader(imagesUrl),
    };
    mount(App, { propsData });
    cy.get('fieldset').should('exist');
    cy.get('[data-test-id="search__field"]')
      .type('el')
      .wait(2500)
      .get('[data-test-id="promt-card"]')
      .should('have.length', 2)
      .first()
      .click()
      .get('[data-test-id="promt-card"]')
      .should('not.exist')
      .get('[data-test-id="search__field"]')
      .should('have.value', 'Ervin Howell');
  });
  it('shows error messages', () => {
    const propsData = {
      dataLoader: () => loader('http://some-stupid-addres.com'),
      imagesLoader: () => loader('http://some-ugly-images.com'),
    };
    mount(App, { propsData });
    cy.get('fieldset').should('exist');
    cy.get('[data-test-id="search__field"]')
      .type('el')
      .wait(2500)
      .get('[data-test-id="promt-card"]')
      .should('not.exist')
      .get('.error')
      .should('exist')
      .wait(2500)
      .get('.error')
      .should('not.exist');
  });
});
