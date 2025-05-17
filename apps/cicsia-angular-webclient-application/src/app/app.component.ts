import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@cicsia-nx-monorepo-workspace/shared-ui';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>TreeGrid Demo</h1>
      <shared-tree-grid></shared-tree-grid>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 20px;
      color: #333;
    }

    shared-tree-grid {
      display: block;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
  `]
})
export class AppComponent implements AfterViewInit {
  private columns: string[] = ['Detail', 'Value1', 'Value2'];

  private treeData = [
    {
      Detail: 'Application',
      expanded: true,
      children: [
        { Detail: 'Application name', Value1: 'Applid C56C1C01', Value2: 'Applid C56C1C01' },
        { Detail: 'Major application version', Value1: '0', Value2: '0' },
        { Detail: 'Micro application version', Value1: '0', Value2: '0' },
        { Detail: 'Minor application version', Value1: '0', Value2: '0' },
        { Detail: 'Operation', Value1: '', Value2: '' },
        { Detail: 'Platform', Value1: '', Value2: '' }
      ]
    },
    {
      Detail: 'Basic',
      expanded: true,
      children: [
        { Detail: 'Hold Status', Value1: 'TASKLIFE', Value2: 'TASKLIFE' },
        { Detail: 'Home Sysid', Value1: '1561', Value2: '1561' },
        { Detail: 'Library Dataset Name', Value1: 'ITBLD.IAT01.MASTER.TESTLOAD', Value2: 'ITBLD.IAT01.MASTER.TESTLOAD' },
        { Detail: 'Library Name', Value1: 'DFHRPL', Value2: 'DFHRPL' },
        { Detail: 'Module Type', Value1: 'PROGRAM', Value2: 'PROGRAM' }
      ]
    },
    {
      Detail: 'CICS IA',
      expanded: true,
      children: [
        { Detail: 'Collection ID', Value1: 'IATestapps', Value2: 'IAWsimConvert' },
        { Detail: 'First Run', Value1: '2025-01-31 19:25:37.755826', Value2: '2025-01-31 19:29:42.150023' },
        { Detail: 'Last Run', Value1: '2025-01-31 19:25:38.086283', Value2: '2025-01-31 19:29:42.570994' }
      ]
    }
  ];

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    // Wait for the custom element to be defined
    customElements.whenDefined('shared-tree-grid').then(() => {
      const treeGrid = this.elementRef.nativeElement.querySelector('shared-tree-grid');
      if (treeGrid) {
        // Set properties using Object.assign and request update
        Object.assign(treeGrid, {
          data: this.treeData,
          columns: this.columns
        });
        treeGrid.requestUpdate();
      }
    });
  }
}
