interface Readable {
  read: () -> String
}

class Stream implements Readable {
  read = () -> "hello"
}
