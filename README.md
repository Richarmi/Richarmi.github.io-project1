// Minimum MVP:
//   - Chewie is to move around the board using the arrow keys
//   - Chewie is to obtain equipment items by moving to the item's
//     corresponding time
//   - the porgs are to move around randomly
//   - when the porgs move to a tile that contains an equipment item
//     they damage it
//
// Chewie
//   - moves around the board
//   - moves are controlled by the player using the arrow keys
//   - objectives
//     * pick up equipment items by moving to where they are
//     * roar at the porgs/porglets
//
//  Porgs (enemies)
//   - move around the board randomly
//   - when roared at
//     * disappear from the board
//     * move back from Chewie
//   - porglets move twice as fast, but
//     cause half as much damage, and have
//     higher chances of disappearing when
//     roared at
//   - have a chance of befriending Chewie
//     when approached
//
// objectives
//   - Chewie must obtain the required number of equipment items
//     in order to win the current level
//   - If the porgs completely destroy the required number of items
//     Chewie must obtain, Chewie loses.
//   - porgs that are loyal to Chewie can obtain the required items
//     for Chewie (they won't destroy those items).
//   - When Chewies roars at a porg that is loyal to him, that porg's
//     loyalty stat will decrease, but it will not disappear or move away.
//   - The higher a porg's loyalty stat, the higher the chance the porg will
//     obtain the equipment item and not damage it.
