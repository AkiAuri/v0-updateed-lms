export const getGradeColor = (grade: number) => {
  if (grade >= 70) {
    return {
      bg: "bg-green-900/30",
      text: "text-green-400",
      border: "border-green-500/30",
      light: "bg-green-100",
      darkText: "text-green-700",
    }
  }
  if (grade >= 50) {
    return {
      bg: "bg-yellow-900/30",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
      light: "bg-yellow-100",
      darkText: "text-yellow-700",
    }
  }
  return {
    bg: "bg-red-900/30",
    text: "text-red-400",
    border: "border-red-500/30",
    light: "bg-red-100",
    darkText: "text-red-700",
  }
}

export const getGradeLabel = (grade: number) => {
  if (grade >= 70) return "Passing"
  if (grade >= 50) return "Warning"
  return "Failing"
}
