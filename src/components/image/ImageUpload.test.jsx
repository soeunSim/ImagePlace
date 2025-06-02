import { describe, expect, render, test } from "vitest";

import ImageUpload from "./ImageUpload";

describe("ImageUpload 컴포넌트 렌더링", () => {
  test("드래그앤드롭 input과 파일 업로드 input이 모두 존재하는가", () => {
    render(<ImageUpload />);

    const dragDropInput = screen.getByTestId("drag-drop-input");
    const fileUploadInput = screen.getByTestId("file-upload-input");

    expect(dragDropInput).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
  });
});
