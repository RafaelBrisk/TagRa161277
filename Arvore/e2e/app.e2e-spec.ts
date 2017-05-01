import { ArvorePage } from './app.po';

describe('arvore App', () => {
  let page: ArvorePage;

  beforeEach(() => {
    page = new ArvorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
