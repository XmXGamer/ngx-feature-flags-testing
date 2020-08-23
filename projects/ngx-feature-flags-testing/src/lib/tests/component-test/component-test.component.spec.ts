import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentTestComponent } from './component-test.component';
import { NgxFeatureFlagsTestingModule } from '../../ngx-feature-flags-testing.module';

describe('ComponentTestComponent', () => {
  let component: ComponentTestComponent;
  let fixture: ComponentFixture<ComponentTestComponent>;
  describe.each([
    ['per default', NgxFeatureFlagsTestingModule],
    ['with single flag', NgxFeatureFlagsTestingModule.withFeatureFlag('featureA')],
  ])('when import %s', (a, b) => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ComponentTestComponent],
        imports: [b],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ComponentTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not show the block #featureAOn', () => {
      const element = fixture.debugElement.query(By.css('#featureAOn'));
      expect(element).toBeNull();
    });
    it('should show the block #featureAOff', () => {
      const element = fixture.debugElement.query(By.css('#featureAOff'));
      expect(element).not.toBeNull();
    });
  });
  describe.each([['with single flag enabled', NgxFeatureFlagsTestingModule.withFeatureFlag('featureA', true)]])(
    'when import %s',
    (a, b) => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ComponentTestComponent],
          imports: [b],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(ComponentTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should show the block #featureAOn', () => {
        const element = fixture.debugElement.query(By.css('#featureAOn'));
        expect(element).not.toBeNull();
      });
      it('should not show the block #featureAOff', () => {
        const element = fixture.debugElement.query(By.css('#featureAOff'));
        expect(element).toBeNull();
      });
    }
  );
});
