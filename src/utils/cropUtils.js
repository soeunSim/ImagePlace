export function getHandleUnderMouse(cropRect, mouseX, mouseY, handleSize) {
  const half = handleSize / 2;
  const { x, y, width, height } = cropRect;

  if (
    mouseX >= x - half &&
    mouseX <= x + half &&
    mouseY >= y - half &&
    mouseY <= y + half
  )
    return "tl";

  if (
    mouseX >= x + width - half &&
    mouseX <= x + width + half &&
    mouseY >= y - half &&
    mouseY <= y + half
  )
    return "tr";

  if (
    mouseX >= x - half &&
    mouseX <= x + half &&
    mouseY >= y + height - half &&
    mouseY <= y + height + half
  )
    return "bl";

  if (
    mouseX >= x + width - half &&
    mouseX <= x + width + half &&
    mouseY >= y + height - half &&
    mouseY <= y + height + half
  )
    return "br";

  return null;
}
