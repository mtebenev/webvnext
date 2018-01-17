import {Component} from '@angular/core';

import {OidcSecurityService} from 'angular-auth-oidc-client';
import {FileUploader, FileUploaderOptions, FileItem} from 'ng2-file-upload';

@Component({
  selector: 'data-upload',
  templateUrl: './data-upload.component.html'
})

export class DataUploadComponent {

  private _fileUploader: FileUploader;

  constructor(private oidcSecurityService: OidcSecurityService) {

    const token = this.oidcSecurityService.getToken();

    let fileUploaderOptions: FileUploaderOptions = {
      url: 'http://localhost:5200/api/adminData',
      method: 'POST',
      disableMultipart: false,
      authToken: 'Bearer ' + token,
      authTokenHeader: 'Authorization'
    };
    this._fileUploader = new FileUploader(fileUploaderOptions);
    this._fileUploader.onAfterAddingFile = (fileItem) => {
      this.handleAfterAddingFile(fileItem);
    };

    this._fileUploader.onBeforeUploadItem = (fileItem) => {
      fileItem.withCredentials = false;
    };
  }

  /**
   * Bound file uploader
   */
  public get uploader(): FileUploader {
    return this._fileUploader;
  }

  private handleAfterAddingFile(fileItem: FileItem) {
    fileItem.upload();
  }
}
