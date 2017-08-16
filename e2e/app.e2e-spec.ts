import { CollectiveUncommonPage } from './app.po';

describe('collective-uncommon App', () => {
  let page: CollectiveUncommonPage;

  beforeEach(() => {
    page = new CollectiveUncommonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
