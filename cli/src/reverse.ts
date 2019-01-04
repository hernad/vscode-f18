export default function reverse() {
    
    for (let i=0; i<10; i++) {
      this.state.items.push(`bilo sta ${i}`);
    }

    this.setState(this.state.items.reverse());
}