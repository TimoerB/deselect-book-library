export const timedOutMessage = (initialMessageState, finalMessageState) => {
  initialMessageState()
  setTimeout(() => {
    finalMessageState();
  }, 2000)
}
