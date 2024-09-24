import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import Layout from "../components/Layout";
import {UnSubscriptionApi} from "../Data/api"
 import UnsubscribeSingleUser from "./UnsubscribeSingleUser";
export default function Unsubscriptions() {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formattedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={`${className} flex flex-col sm:flex-row items-center w-full`}
        style={{ backgroundColor: "transparent" }}
      >
        <div className="flex space-x-2">
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:ml-auto">
          <span>{formattedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-4/5 p-3 rounded-lg bg-gray-100 shadow-md mb-3">
        <div className="flex items-center w-full sm:w-1/2">
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            className="w-20 h-20 rounded-lg"
          />
          <span className="flex flex-col text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2 ml-3"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex flex-col items-center rounded">
        <i
          className="pi pi-file mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span className=" text-s text-center text-gray-500">
          Drag and Drop Your Text File Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-s p-button-rounded p-button-outlined bg-blue-500 text-white",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-choose-btn p-button-s p-button-rounded p-button-outlined bg-green-500 text-white",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-choose-btn p-button-s p-button-rounded p-button-outlined bg-red-500 text-white",
  };

  return (
    <Layout>
    
    <UnsubscribeSingleUser/>
      <div className="w-[360px] md:w-full mx-auto ">
        <div className="bg-white p-6  shadow-md">
          <h1 className="text-center text-s md:text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            Upload MSISDN/Alias List to Deactivate
          </h1>
          <div className="bg-gray-200">
          <Toast ref={toast}></Toast>
<Tooltip
  target=".custom-choose-btn"
  content="Choose"
  position="bottom"
/>
<Tooltip
  target=".custom-upload-btn"
  content="Upload"
  position="bottom"
/>
<Tooltip
  target=".custom-cancel-btn"
  content="Clear"
  position="bottom"
/>
          </div>
        
          <FileUpload
            ref={fileUploadRef}
            name="file"
            url={`${UnSubscriptionApi}`}
            multiple
            accept="file/*"
            maxFileSize={10000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </div>
      </div>
    </Layout>
  );
}
