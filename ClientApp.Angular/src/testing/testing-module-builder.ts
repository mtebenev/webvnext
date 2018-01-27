import {TestBed, async, TestModuleMetadata, ComponentFixtureAutoDetect} from '@angular/core/testing';

/**
 * Utility class for building angular testing module with less friction
 */
export class TestingModuleBuilder {

  private _isAutodetect: boolean; // Provides autodetect feature if true (default)

  private readonly _moduleImports: any[];
  private readonly _moduleDeclarations: any[];

  private constructor() {

    this._isAutodetect = true;
    this._moduleImports = [];
    this._moduleDeclarations = [];
  }

  /**
   * Factory method for the builder
   */
  public static create(): TestingModuleBuilder {
    return new TestingModuleBuilder();
  }

  public addImports(...imports: any[]): TestingModuleBuilder {
    this._moduleImports.push(imports);
    return this;
  }

  public addDeclarations(...declarations: any[]): TestingModuleBuilder {
    this._moduleDeclarations.push(declarations);
    return this;
  }

  /**
   * Use to enable/disable auto-detect on the testing module (enabled by default)
   */
  public withAutoDetect(useAutoDetect = true): TestingModuleBuilder {
    this._isAutodetect = useAutoDetect;
    return this;
  }

  /**
   * Should be a final call to compose the metadata and invoke  beforeEach(...)
   */
  public build(): void {

    let moduleMetadata = this.buildMetadata();

    beforeEach(async(() => {
      TestBed.configureTestingModule(moduleMetadata).compileComponents();
    }));
  }

  private buildMetadata(): TestModuleMetadata {

    let moduleMetadata: TestModuleMetadata = {
      imports: this._moduleImports,
      declarations: this._moduleDeclarations,
      providers: []
    };

    // TODO MTE: remove unnecessary check when upgraded to TS2.6 with ts-ignore
    if(this._isAutodetect && moduleMetadata.providers)
      moduleMetadata.providers.push({provide: ComponentFixtureAutoDetect, useValue: true});

    return moduleMetadata;
  }
}
