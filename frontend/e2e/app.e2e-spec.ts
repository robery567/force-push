import { ForcePushPage } from './app.po';

describe('force-push App', () => {
  let page: ForcePushPage;

  beforeEach(() => {
    page = new ForcePushPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
